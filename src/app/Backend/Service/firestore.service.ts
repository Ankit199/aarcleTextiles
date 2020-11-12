
import { Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { AngularFireStorage } from 'angularfire2/storage';
import * as firebase from 'firebase/firebase';
import 'firebase/firestore';
//import { Observable } from 'rxjs/Observable';
import * as _ from 'lodash';
import { Observable } from 'rxjs';
import { map,take  } from 'rxjs/operators'; 


type CollectionPredicate<T> = string | AngularFirestoreCollection<T>;
type DocPredicate<T> = string | AngularFirestoreDocument<T>;

@Injectable()
export class FirestoreService {

  constructor(public afs: AngularFirestore, private afStorage: AngularFireStorage) { }

  /// **************
  /// Get a Reference
  /// **************

  col<T>(ref: CollectionPredicate<T>, queryFn?: any): AngularFirestoreCollection<T> {
    return typeof ref === 'string' ? this.afs.collection<T>(ref, queryFn) : ref;
  }

  doc<T>(ref: DocPredicate<T>): AngularFirestoreDocument<T> {
    return typeof ref === 'string' ? this.afs.doc<T>(ref) : ref;
  }

  /// **************
  /// Get Data
  /// **************

  doc$<T>(ref:  DocPredicate<T>): Observable<T> {
    return this.doc(ref).snapshotChanges().pipe(map((doc) => {
      return doc.payload.data() as T;
    }));
  }

  col$<T>(ref: CollectionPredicate<T>, queryFn?: any): Observable<T[]> {
    return this.col(ref, queryFn).snapshotChanges().pipe(map((docs) => {
      return docs.map((a) => a.payload.doc.data()) as T[];
    }));
  }

  /// with Ids
  colWithIds$<T>(ref: CollectionPredicate<T>, queryFn?: any): Observable<any[]> {
    return this.col(ref, queryFn).snapshotChanges().pipe(map((actions) => {
      return actions.map((a:any) => {
        const data = a.payload.doc.data();
        const id = a.payload.doc.id;
        return { id, ...data };
      });
    }));
  }

  /// **************
  /// Write Data
  /// **************

  /// Firebase Server Timestamp
  get timestamp() {
    return firebase.firestore.FieldValue.serverTimestamp();
  }

  set<T>(ref: DocPredicate<T>, data: any) {
    const prunedData = this.pruneEmpty(data);
    return this.doc(ref).set(prunedData);
  }

  update<T>(ref: DocPredicate<T>, data: any) {
    const prunedData = this.pruneEmpty(data);
    return this.doc(ref).update(prunedData);
  }

  delete<T>(ref: DocPredicate<T>) {
    return this.doc(ref).delete();
  }

  add<T>(ref: CollectionPredicate<T>, data: any) {
    const prunedData = this.pruneEmpty(data);
    return this.col(ref).add(prunedData);
  }

  geopoint(lat: number, lng: number) {
    return new firebase.firestore.GeoPoint(lat, lng);
  }

  /// If doc exists update, otherwise set
  upsert<T>(ref: DocPredicate<T>, data: any) {
    const doc = this.doc(ref).snapshotChanges().pipe(take(1)).toPromise();

    return doc.then((snap) => {
      return snap.payload.exists ? this.update(ref, data) : this.set(ref, data);
    });
  }

  /// **************
  /// Inspect Data
  /// **************

  inspectDoc(ref: DocPredicate<any>): void {
    const tick = new Date().getTime();
    this.doc(ref).snapshotChanges()
        .pipe(take(1))
        // .do((d) => {
        //   const tock = new Date().getTime() - tick;
        //   // console.log(`Loaded Document in ${tock}ms`, d);
        // })
        .subscribe();
  }

  inspectCol(ref: CollectionPredicate<any>): void {
    const tick = new Date().getTime();
    this.col(ref).snapshotChanges()
        .pipe(take(1))
        // .do((c) => {
        //   const tock = new Date().getTime() - tick;
        //   // console.log(`Loaded Collection in ${tock}ms`, c);
        // })
        .subscribe();
  }

  /// **************
  /// Create and read doc references
  /// **************

  /// create a reference between two documents
  connect(host: DocPredicate<any>, key: string, doc: DocPredicate<any>) {
    return this.doc(host).update({ [key]: this.doc(doc).ref });
  }

  /// returns a documents references mapped to AngularFirestoreDocument
  docWithRefs$<T>(ref: DocPredicate<T>) {
    return this.doc$(ref).pipe(map((doc: any) => {
      for (const k of Object.keys(doc)) {
        if (doc[k] instanceof firebase.firestore.DocumentReference) {
          doc[k] = this.doc(doc[k].path);
        }
      }
      return doc;
    }));
  }

  pruneEmpty(obj: any) {
    const prune = (current: any) => {
      _.forOwn(current, (value, key) => {
        if (_.isUndefined(value) || _.isNull(value) || _.isNaN(value) ||
          (_.isString(value) && _.isEmpty(value)) ||
          (_.isObject(value) && _.isEmpty(prune(value)))) {
          delete current[key];
        }
      });
      // remove any leftover undefined values from the delete
      // operation on an array
      if (_.isArray(current)) {
        _.pull(current, undefined);
      }
      return current;
    };
    return prune(_.cloneDeep(obj));  // Do not modify the original object, create a clone instead
  }

  validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach((field: any) => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof FormGroup) {
        this.validateAllFormFields(control);
      }
    });
  }

  getFileStorageRef(path: string) {
    return this.afStorage.ref(path);
  }

  uploadFileToStorage(path: string, file: File) {
    return this.afStorage.upload(path, file);
  }

  deleteFileStorage(path: string) {
    return this.afStorage.ref(path).delete();
  }

  /// **************
  /// Atomic batch example
  /// **************

  /// Just an example, you will need to customize this method.
  atomic() {
    const batch = firebase.firestore().batch();
    /// add your operations here

    const itemDoc = firebase.firestore().doc('items/myCoolItem');
    const userDoc = firebase.firestore().doc('users/userId');

    const currentTime = this.timestamp;

    batch.update(itemDoc, { timestamp: currentTime });
    batch.update(userDoc, { timestamp: currentTime });

    /// commit operations
    return batch.commit();
  }

}
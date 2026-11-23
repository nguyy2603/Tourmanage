//để gom các hàm thao tác CRUD(thêm,sửa,xóa,lấy dsach) vs collection"tours""
//trên firestore,giúp các trang/component
//chỉ cần gọi hàm mà k cần biết chi tiết cú pháp firestore

import { db } from './config';
import {collection,query,orderBy,getDocs,addDoc,updateDoc,deleteDoc,doc,serverTimestamp,} from 'firebase/firestore';

const tourCollectionRef = collection(db, 'tours');
//đọc
export async function getTours() {
  const q = query(tourCollectionRef, orderBy('createdAt', 'desc'));
  const snapshot = await getDocs(q);
  return snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
}
//thêm
export async function addTour(tour) {
  return addDoc(tourCollectionRef, { ...tour, createdAt: serverTimestamp() });
}
//sửa
export async function updateTour(id, tour) {
  return updateDoc(doc(db, 'tours', id), tour);
}
//xóa
export async function deleteTour(id) {
  return deleteDoc(doc(db, 'tours', id));
}

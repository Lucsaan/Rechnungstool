import { Injectable } from '@angular/core';

@Injectable()
export class DbService {

  constructor() { }


  getAllDocs(dataBase: string, docs?, descending?) {
    const db = new PouchDB(dataBase);
    return db.allDocs({ include_docs: docs, descending: descending });
  }

  getDoc(dataBase: string, id: string) {
    const db = new PouchDB(dataBase);
    return db.get(id);
  }

  saveDoc(dataBase: string, doc) {
    const db = new PouchDB(dataBase);
    return db.put(doc);
  }
}

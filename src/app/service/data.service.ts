import { Injectable } from '@angular/core';
import { Funcionario } from '../model/funcionario.model';
import { HttpClient } from '@angular/common/http';
import { AngularFirestore } from '@angular/fire/compat/firestore';
@Injectable({
  providedIn: 'root'
})
export class DataService {
  private baseUrl = "http://localhost:4000/";
  private collectionEmp = "funcionarios";

  constructor(private http: HttpClient,  private firestore: AngularFirestore) {}

  // Criar funcionário
  addFuncionario(funcionario: Funcionario) {
    return this.http.post(`${this.baseUrl}funcionarios`, {
      nome: funcionario.nome,
      email: funcionario.email,
      cargo: funcionario.cargo,
      salario: funcionario.salario
    }).subscribe();
  }

  // Obter todos os funcionários
  getAllFuncionarios() {
    return this.firestore.collection(this.collectionEmp).snapshotChanges();
    // return this.http.get(`${this.baseUrl}/funcionarios`);
  }


  // Obter funcionário específico
  // getFuncionario(key: string) {
  //   return this.afs.collection<Funcionario>('funcionarios').doc(key).valueChanges();
  // } 

  // // Obter lista de funcionários
  // GetFuncionariosList() : AngularFireList<Funcionario> {
  //   return this.funcionariosRef;
  // }

  // // Atualizar funcionário
  // updateFuncionario(key: string, value: any): Promise<void> {
  //   return this.funcionariosRef.update(key, value);
  // }

  // // Deletar funcionário  
  //   deleteFuncionario(key: string) {
  //     return this.afs.collection<Funcionario>('funcionarios').doc(key).delete();
  //   }

}

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
    });
  }

  // Obter todos os funcionários
  getAllFuncionarios() {
    return this.http.get(`${this.baseUrl}`);
  }

  // // Obter funcionário específico
  getFuncionario(id: string) {
    return this.http.get(`${this.baseUrl}funcionarios/${id}`);
  }

  // // Atualizar funcionário
  updateFuncionario(id: string, funcionario: Funcionario) {
    return this.http.put(`${this.baseUrl}funcionarios/${id}`, funcionario);
  }

  // // Deletar funcionário
  deleteFuncionario(id: string) {
    return this.http.delete(`${this.baseUrl}funcionarios/${id}`);
  }
}

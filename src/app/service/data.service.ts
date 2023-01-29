import { Injectable } from '@angular/core';
import { Funcionario } from '../model/funcionario.model';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private dbPath = '/dashboard';

  funcionariosRef: AngularFireList<Funcionario>;

  constructor(private db: AngularFireDatabase, private afs: AngularFirestore) {
    this.funcionariosRef = db.list(this.dbPath);
  }

  // Criar funcionário
  AddFuncionario(funcionario: Funcionario) : void {
    this.afs.collection<Funcionario>('funcionarios').add({
      nome: funcionario.nome,
      email: funcionario.email,
      cargo: funcionario.cargo,
      salario: funcionario.salario,
    });
  }


  // Obter funcionário específico
  getFuncionario(key: string) {
    return this.afs.collection<Funcionario>('funcionarios').doc(key).valueChanges();
  } 

  // Obter lista de funcionários
  GetFuncionariosList() : AngularFireList<Funcionario> {
    return this.funcionariosRef;
  }

  // Atualizar funcionário
  updateFuncionario(key: string, value: any): Promise<void> {
    return this.funcionariosRef.update(key, value);
  }

  // Deletar funcionário  
    deleteFuncionario(key: string) {
      return this.afs.collection<Funcionario>('funcionarios').doc(key).delete();
    }

}

import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms'
import { Funcionario } from 'src/app/model/funcionario.model';
import { DataService } from 'src/app/service/data.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  funcionarios !: FormGroup;
  funcionarioObj : Funcionario = new Funcionario();
  funcionarioList : Funcionario[] = [];

  constructor(private formBuilder : FormBuilder,  private DataService : DataService, 
    private router: Router
    ) { }

  ngOnInit(): void {

    this.getAllFuncionarios();

    this.funcionarios = this.formBuilder.group({
      nome: [''],
      email: [''],
      salario: [''],
      cargo: ['']
    });
  }

  addFuncionario() {
    this.funcionarioObj.nome = this.funcionarios.controls['nome'].value;
    this.funcionarioObj.email = this.funcionarios.controls['email'].value;
    this.funcionarioObj.salario = this.funcionarios.controls['salario'].value;
    this.funcionarioObj.cargo = this.funcionarios.controls['cargo'].value;
    this.DataService.addFuncionario(this.funcionarioObj);
    this.getAllFuncionarios();
  }

  getAllFuncionarios() {
    this.DataService.getAllFuncionarios().subscribe(data => {
      this.funcionarioList =  (data as Array<any>).map(e => {
        return {
          id: e.payload.doc.id,
          nome: e.payload.doc.data()['nome'],
          email: e.payload.doc.data()['email'],
          salario: e.payload.doc.data()['salario'],
          cargo: e.payload.doc.data()['cargo']
        } as Funcionario;
      });
    });
  }
  

  // getAllFuncionarios() {
  //   this.DataService.getAllFuncionarios().subscribe(data => {
  //     this.funcionarioList = data.map(e => {
  //       return {
  //         id: e.payload.doc.id,
  //         nome: e.payload.doc.data()['nome'],
  //         email: e.payload.doc.data()['email'],
  //         salario: e.payload.doc.data()['salario'],
  //         cargo: e.payload.doc.data()['cargo']
  //       } as Funcionario;
  //     })
  //   });
  // }
    

  // editEmployee(emp : Funcionario) {
  //   this.funcionarios.controls['nome'].setValue(emp.nome);
  //   this.funcionarios.controls['email'].setValue(emp.email);
  //   this.funcionarios.controls['salario'].setValue(emp.salario);
  //   this.funcionarios.controls['cargo'].setValue(emp.cargo);

  // }

  // updateEmployee(key: string, employee: Funcionario) {
  //   this.DataService.updateFuncionario(key, employee)
  // }


  // deleteEmployee(id: string) {
  //   this.DataService.deleteFuncionario(id).then(res => {
  //       alert('Funcionario excluido com sucesso!');
  //       this.getAllFuncionarios();
  //   }, err => {
  //       console.log(err);
  //   });
  // }
}
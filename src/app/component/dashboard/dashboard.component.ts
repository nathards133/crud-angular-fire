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

  addEmployee() {
    this.funcionarioObj.nome = this.funcionarios.value.nome;
    this.funcionarioObj.salario = this.funcionarios.value.salario;
    this.funcionarioObj.email = this.funcionarios.value.email;
    this.funcionarioObj.cargo = this.funcionarios.value.cargo;
    this.DataService.AddFuncionario(this.funcionarioObj);
    console.log(this.funcionarioObj);
  }

  getAllFuncionarios(): Observable<Funcionario[]> {
    return this.DataService.getAllFuncionarios();
  }
    

  editEmployee(emp : Funcionario) {
    this.funcionarios.controls['nome'].setValue(emp.nome);
    this.funcionarios.controls['email'].setValue(emp.email);
    this.funcionarios.controls['salario'].setValue(emp.salario);
    this.funcionarios.controls['cargo'].setValue(emp.cargo);

  }

  updateEmployee(key: string, employee: Funcionario) {
    this.DataService.updateFuncionario(key, employee)
  }


  deleteEmployee(id: string) {
    this.DataService.deleteFuncionario(id).then(res => {
        alert('Funcionario excluido com sucesso!');
        this.getAllFuncionarios();
    }, err => {
        console.log(err);
    });
}
}
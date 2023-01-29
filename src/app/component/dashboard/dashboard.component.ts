import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms'
import { Funcionario } from 'src/app/model/funcionario.model';
import { DataService } from 'src/app/service/data.service';
import { Router } from '@angular/router';

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
      nome: new FormControl(''),
      email: new FormControl(''),
      cargo: new FormControl(''),
      salario: new FormControl(''),
    });
  }

  addEmployee() {
    console.log(this.funcionarios);
    this.funcionarioObj.nome = this.funcionarios.value.nome;
    this.funcionarioObj.salario = this.funcionarios.value.salario;
    this.funcionarioObj.email = this.funcionarios.value.email;
    this.funcionarioObj.cargo = this.funcionarios.value.cargo;
    this.DataService.AddFuncionario(this.funcionarioObj);
  }

  getAllFuncionarios() {
    this.DataService.GetFuncionariosList().
    snapshotChanges().subscribe(item => {
      this.funcionarioList = [];
      item.forEach(element => {
        let y = element.payload.toJSON();
        this.funcionarioList.push(y as Funcionario);
      });
    }
    );
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
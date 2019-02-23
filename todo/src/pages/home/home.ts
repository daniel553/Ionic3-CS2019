import { Component } from '@angular/core';
import { NavController, AlertController, reorderArray, ToastController } from 'ionic-angular';

import { TodoProvider } from "../../providers/todo/todo";
import { ArchivedTodosPage } from "../archived-todos/archived-todos";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
	public todos = [];
  public reorderIsEnabled = false;
  public archiveTodosPage = ArchivedTodosPage;

  constructor(private toastController: ToastController, private todoProvider: TodoProvider, public navCtrl: NavController, private alertController: AlertController) {
  	this.todos = this.todoProvider.getTodos();
  }

  archiveTodo(todoIndex){
    this.todoProvider.archiveTodo(todoIndex);
  }

  goToArchivePage(){
    this.navCtrl.push(ArchivedTodosPage);
  }

  toggleReorder(){
    this.reorderIsEnabled = !this.reorderIsEnabled;
  }

  itemReordered($event){
    reorderArray(this.todos, $event);
  }

  openTodoAlert(){
  	let addTodoAlert = this.alertController.create({
  		title: "Add A Todo",
  		message: "Enter Your Todo",
  		inputs: [
  			{
  				type: "text",
  				name: "addTodoInput"
  			}
  		],
  		buttons: [
  			{
  				text: "Cancel"
  			},
  			{
  				text: "Add Todo",
  				handler: (inputData)=> {
  					let todoText;
  					todoText = inputData.addTodoInput;
  					this.todoProvider.addTodo(todoText);

            addTodoAlert.onDidDismiss(()=>{
              let addTodoToast = this.toastController.create({
                message: "Todo Added",
                duration: 2000
              });
              addTodoToast.present();
            });
  				}
  			}
  		]
  	});
  	addTodoAlert.present();
  }

}

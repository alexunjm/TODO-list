import { DateHelperService } from './../../shared/services/date/date-helper.service';
import { Component, OnInit } from '@angular/core';

import { EditableItem } from './../../shared/business';
import { Item } from 'src/app/shared/business';
import { NmbToArr } from './../../shared/pipes/format/format';
import { ToDoListMockService } from './../../shared/services';

@Component({
  templateUrl: './user.component.html',
  styles: [],
  providers: [NmbToArr]
})
export class UserComponent implements OnInit {

  toDoList: Array<Item>;
  editable: {title: string, index: number, item: any};

  constructor(private toDoListService: ToDoListMockService, private dateHelper: DateHelperService) {
    this.toDoListService.getAll().then(list => this.toDoList = list);
    this.hideModal();
  }

  ngOnInit(): void {/*
    const sampleFrom2 = this.toDoList[2].cloneToJson();

    Promise.resolve().then(() => {
      return this.toDoListService.createToDo(sampleFrom2, this.toDoList);
    }).then((createdItem) => {
      console.log('UserComponent -> ngOnInit -> createToDo', {createdItem});
      return this.toDoListService.getToDoById(this.toDoList[0].getId(), this.toDoList);
    }).then((found) => {
      console.log('UserComponent -> ngOnInit -> getToDoById', {found});

      // const lastItem = this.toDoList[this.toDoList.length - 1];
      const lastItem = this.toDoList[1];
      console.log('UserComponent -> ngOnInit -> lastItem', {lastItem, list: this.toDoList});

      return this.toDoListService.updateToDo(
        {...lastItem, _id: lastItem.getId(), name: `(updated) test ${this.toDoList.length}`},
        this.toDoList
      );
    }).then(index => {
      console.log('UserComponent -> ngOnInit -> updateToDo', {index, list: this.toDoList});
      return this.toDoListService.deleteToDoById(
        this.toDoList[2].getId(),
        this.toDoList
      );
    }).then(index => {
      console.log('UserComponent -> ngOnInit -> deleteToDoById', {index, list: this.toDoList});
    }); */
  }

  hideModal() {
    this.editable = {title: null, index: null, item: null};
  }

  handleCreate() {
    this.editable = {title: 'Crear tarea', index: null, item: this.toDoListService.createEmptyToDo().cloneToJson()};
    console.log({item: this.editable.item});
  }

  handleEdit(index: number) {
    const item = this.toDoList[index].cloneToJson();
    console.log({item});
    this.editable = {title: 'Editar tarea', index, item};
  }

  editItemDate(strDate: string) {
    this.editable.item.date = this.dateHelper.dateFromString(strDate, this.editable.item.date);
    // console.log('UserComponent -> editItemDate -> date', {date: this.editable.item.date});
  }

  editItemTime(strHM) {
    this.editable.item.date = this.dateHelper.dateFromTimeString(strHM, this.editable.item.date);
    // console.log('UserComponent -> editItemTime -> date', {date: this.editable.item.date});
  }

  saveItem() {
    console.log('guardando los cambios...', {old: this.toDoList[this.editable.index], new: this.editable.item});

    this.toDoListService.updateToDo(
      {...this.editable.item, _id: this.toDoList[this.editable.index].getId()},
      this.toDoList
    ).then(console.log);
  }

}

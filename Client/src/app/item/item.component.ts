import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Item } from './item';
import { ItemServise } from './item.service';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {
  [x: string]: any;

  public item: Item []=[];
  public editItem: Item | undefined;
  public deleteItem!: Item;

  constructor( private itemService : ItemServise) { }

  ngOnInit(): void {
    this.getItems();          //View an item
  }
   public getItems():void {{
    this.itemService.getItemList().subscribe(
      (Response: Item[]) => {
        this.item = Response;
        console.log(this.item);
      },
      (error:HttpErrorResponse) =>
      alert(error.message)
    
        );
   }}

   public onAddItem(addForm: NgForm): void                         //Add an item
   {
    (document.getElementById("add-item-form") as HTMLElement).click();
    this.itemService.addItem(addForm.value).subscribe(
      (Response: Item)=>{
        console.log(Response);
        this.getItems();
        addForm.reset();
      },
      (error:HttpErrorResponse) =>{
      alert(error.message);
    }
    );
  }

  public onDeleteItem(itemId:number):void         //Delete an item
  {
    this.itemService.deleteItem(itemId).subscribe(
      (Response:void)=>{
        console.log(Response);
        this.getItems();
      },
      (error:HttpErrorResponse) =>{
      alert(error.message);
    }
    );
  }

public onUpdateItem(Item: Item):void                 //Update an item
{
  this.itemService.updateItem(Item).subscribe(
    (Response:Item)=>{
      console.log(Response);
      this.getItems();
    },
    (error:HttpErrorResponse) =>{
      alert(error.message);
    }
    );
  
  }

  public onOpenModal_item(item:Item, mode:string):void {            //Open modal
    const container = (document.getElementById('item_details_container') as HTMLInputElement);
      const button = document.createElement('button');
      button.type = 'button';
      button.style.display = 'none';
      button.setAttribute('data-bs-toggle','modal');
      if(mode === 'edit'){                                    //edit function
        button.setAttribute('data-bs-target','#exampleModal22');
        this.editItem = item;
      }
      if(mode === 'delete'){                                  //delete function
        button.setAttribute('data-bs-target','#exampleModal23');
        this.deleteItem = item;
      }
      container.appendChild(button);
      button.click();
  }

}
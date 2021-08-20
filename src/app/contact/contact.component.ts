import { Component, OnInit } from '@angular/core';
import { Contact } from './../models/contact';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  contacts: Contact[] = []
  UserID: string = ''

  constructor(private httpClient: HttpClient, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(param => {
      this.UserID = param.get('id')
      console.log(this.UserID)
    })
    this.httpClient.get("http://localhost:3000/contact").subscribe(res => {
      this.contacts = res['data'] as Contact;
      //console.log(res.data[0].user.username)
      console.log()
    })


  }

  addContact(name: string, phone: string, address: string, note: string) {
    //
    //,phone.value
    let contact: Contact = new Contact();
    contact.name = name;
    contact.phone = phone;
    contact.address = address;
    contact.Note = note;
    //contact.user={}
    this.httpClient.post("http://localhost:3000/contact", contact).subscribe(res => {
      //contact.Id = res['data']._id as number
      this.contacts.push(contact)
      console.log(contact)
      alert('add successfully')
    }, err => {
      console.log(err)
    })

  }

  editeContact() {

  }

  deleteContact(indx: number) {
    let cont = this.contacts[indx]
    console.log(cont._id)


    if (this.UserID === cont.user._id) {
      if (confirm('Are you sure you want to save this thing into the database?')) {
        this.httpClient.delete(`http://localhost:3000/contact/${cont._id}`).subscribe(res => {
          console.log(res)
          this.contacts.splice(indx, 1)
        }, (err) => {
          console.log(err)
        })
      }
    } else {
      alert(`you cant delete this contact ,it is for user ${cont.user.username}`)
    }



  }

  deleteALL() {
    this.httpClient.delete('http://localhost:3000/contact').subscribe(res => {
      console.log(res)
      this.contacts.splice(0, this.contacts.length)
    })
  }

}

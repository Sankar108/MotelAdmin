import { Component, EventEmitter, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ngf } from 'angular-file';
import { RoomDetails } from 'src/app/models/room';
import { RoomService } from 'src/app/services/room.service';
import { UtilityService } from 'src/app/services/utility.service';

@Component({
  selector: 'app-add-room',
  templateUrl: './add-room.component.html',
  styleUrls: ['./add-room.component.scss']
})
export class AddRoomComponent implements OnInit {
  public html: '';
  constructor(
    private roomService: RoomService,
    private utilityService: UtilityService
  ) { }
  ngf: ngf // reference to directive class
  multiple: string
  accept: string
  maxSize: number // bytes . 1024 = 1k . 1048576 = 1mb
  ngfFixOrientation: boolean = true
  fileDropDisabled: any = false
  selectable: any = false
  lastInvalids: { file: File, type: string }[] = []
  lastBaseUrl: string // Base64 od last file uploaded url

  files: string[]=[];
  init: EventEmitter<ngf>
  capturePaste: boolean // listen to window paste event for files
  fileToUpload: any;
  images: string[] = [];
  content = "";


  @ViewChild('overviewForm') overviewForm: any;
  roomDetails: RoomDetails = new RoomDetails()
  facilities = [
    { id: 3, name: "Tv" },
    { id: 4, name: "Ac" },
    { id: 5, name: "Wifi" },
    { id: 6, name: "Fan" }
  ]

  public config = {
    placeholder: '',
    tabsize: 2,
    height: '100px',
    uploadImagePath: '/api/upload',
    // toolbar: [
    //   ['style', ['bold', 'italic', 'underline', 'clear']],
    //   ['font', ['bold', 'italic', 'underline', 'clear']],
    //   ['para', ['style', 'ul', 'ol', 'paragraph']],
    // ],
    // fontNames: ['Comic Sans MS', 'Courier New', 'Roboto', 'Times']
  }

  ngOnInit(): void {
  }

  onFileChange(event) {
    this.images = [];
    if (event.target.files && event.target.files[0]) {
      for (var i = 0; i < event.target.files.length; i++) {
        this.files.push(event.target.files[i]);
      }
      
      var filesAmount = event.target.files.length;
      for (let i = 0; i < filesAmount; i++) {
        var reader = new FileReader();

        reader.onload = (event: any) => {
          console.log(event.target.result);
          this.images.push(event.target.result);
          // this.myForm.patchValue({
          //   fileSource: this.images
          // });
        }
        reader.readAsDataURL(event.target.files[i]);
      }
    }
  }

  handleFileInput(files: FileList) {
    this.fileToUpload = files.item;
    console.log(this.fileToUpload);
  }

  AddtoFacility(ev) {
    if (ev.currentTarget.checked) {
      this.roomDetails.Facilities.push(ev.currentTarget.value);
    }
    else {
      let index = this.roomDetails.Facilities.indexOf(ev.currentTarget.value);
      if (index > -1) {
        this.roomDetails.Facilities.splice(index, 1);
      }
    }
  }

  SaveRoom() {
    let formData = new FormData();
    let desc = document.getElementById('txtDescription')["value"];
    this.roomDetails.Description = desc?desc:"";

    formData.append("roomNo", this.roomDetails.RoomNo);
    formData.append("roomTypeId", this.roomDetails.RoomTypeId);
    formData.append("size", this.roomDetails.Size);
    formData.append("noOfBed", this.roomDetails.NoOfBed);
    formData.append("acnonAc", 'true');
    formData.append("IsOccupied", 'false');
    formData.append("IsCleaned", 'true');
    formData.append("description", this.roomDetails.Description);

    this.roomDetails.Facilities.forEach(fac => {
      formData.append("fecilitiesList", fac);
    });

    // let filess: any = this.files;
    // formData.append("image[]", filess);
    for (let index = 0; index < this.files.length; index++) {
      formData.append("image[]", this.files[index]);
    }
    
    // formData.append("image", this.files);
    this.roomService.AddRoomDetails(formData).subscribe((response: any) => {
      if (response.Succeeded) {
        this.utilityService.ShowMsg('room is saved', this.utilityService.success);
      }
      else {
        this.utilityService.ShowMsg(response.Message, this.utilityService.error);
      }
    });
  }
}

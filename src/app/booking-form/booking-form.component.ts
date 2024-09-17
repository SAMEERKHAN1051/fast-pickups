// import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
// Import the types for Google Maps
/// <reference types="@types/google.maps" />
import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MessageService } from 'primeng/api';
import { BookingServicesService } from 'src/app/service/booking-services.service';

interface verificationCodeInterface {
  emailCode: number;
  phoneCode: number;
}

interface bookingInterface {
  name: string;
  email: string;
  phoneNumber: string;
  fromAirport: string;
  toAirport: string;
  departureDate: string;
  departureHour: string;
  departureMin: string;
  isReturn: boolean;
  luggage: string;
  passenger: string;
  returnDate: string;
  returnLagguages: string;
  returnPassengers: string;
}

@Component({
  selector: 'app-home-booking-form',
  templateUrl: './booking-form.component.html',
  styleUrls: ['./booking-form.component.scss'],
})
export class BookingFormComponent implements OnInit, AfterViewInit {
  checkNumber: number = 0;
  hours: string[] = [
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    '10',
    '11',
    '12',
    '13',
    '14',
    '15',
    '16',
    '17',
    '18',
    '19',
    '20',
    '21',
    '22',
    '23',
    '24',
  ];
  minutes: string[] = [
    '0',
    '5',
    '10',
    '15',
    '20',
    '25',
    '30',
    '35',
    '40',
    '45',
    '50',
    '55',
  ];
  isLoader: boolean = false;
  passengers: string[] = ['1', '2', '3', '4', '5', '6', '7'];
  luggages: string[] = ['1', '2', '3', '4', '5', '6', '7'];
  returns: boolean = false;
  bookingForm!: FormGroup;
  readonly fixLocation = 'Barcelona-El Prat Airport';
  emailCode: any = 0;
  phoneCode: any = 0;
  verificationCode: verificationCodeInterface = { emailCode: 0, phoneCode: 0 };
  bookingData: bookingInterface = {
    email: '',
    name: '',
    phoneNumber: '',
    fromAirport: '',
    toAirport: '',
    departureDate: '',
    departureHour: '',
    departureMin: '',
    isReturn: false,
    luggage: '',
    passenger: '',
    returnDate: '',
    returnLagguages: '',
    returnPassengers: '',
  };
  message: string = '';
  messageColor: boolean = false;
  currentDate: Date = new Date();
  nextDate: Date = new Date(this.currentDate);

  @ViewChild('inputFieldOne') inputFieldOne!: ElementRef;
  @ViewChild('inputFieldTwo') inputFieldTwo!: ElementRef;
  visible: boolean = false;
  @ViewChild('verificationModal') verificationModal: any;
  isSubmitted: boolean = false;
  // @Input() placeholder = '';

  dropoffAutocomplete!: google.maps.places.Autocomplete | null;
  pickUpAutocomplete!: google.maps.places.Autocomplete | null;

  constructor(
    private formbuilder: FormBuilder,
    private bookingService: BookingServicesService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.initForm();
    window.addEventListener('initMap', this.initializeAutocomplete.bind(this));
  }

  initForm(): void {
    this.nextDate.setDate(this.currentDate.getDate() + 1);
    this.bookingForm = this.formbuilder.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: [
        '',
        [
          Validators.required,
          Validators.email,
          Validators.pattern(
            /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
          ),
        ],
      ],
      phoneNumber: [
        '+34',
        [
          Validators.required,
          Validators.minLength(12),
          Validators.maxLength(15),
          Validators.pattern(/^(\+\d{1,15})$/),
        ],
      ],
      fromAirport: ['', Validators.required],
      toAirport: ['', Validators.required],
      departureDate: [
        this.currentDate.toISOString().substring(0, 10),
        Validators.required,
      ],
      departureHour: [this.hours[0], Validators.required],
      departureMin: [this.minutes[0], Validators.required],
      passenger: [this.passengers[0], Validators.required],
      luggage: [this.luggages[0], Validators.required],
      isReturn: [false],
      returnDate: [
        this.returns ? this.nextDate.toISOString().substring(0, 10) : null,
      ],
      returnPassengers: [null],
      returnLagguages: [null],
    });
    this._fromAirport = this.fixLocation;
  }

  get fromAirport() {
    return this.bookingForm.get('fromAirport')?.value;
  }

  get contrtoAirportolName(): AbstractControl {
    return this.bookingForm.get('toAirport') as FormControl;
  }

  set _fromAirport(value: any) {
    (this.bookingForm.get('fromAirport') as FormControl).setValue(value);
  }

  set _toAirport(value: any) {
    (this.bookingForm.get('toAirport') as FormControl).setValue(value);
  }

  onContactNumberInput(event: any) {
    const input = event.target;
    const value = input.value;
    const numericValue = value.replace(/[^(\+\d(0-9))]/g, '');
    input.value = numericValue;
  }

  ngAfterViewInit() {
    // // If the API is already loaded, initialize the autocomplete
    if (typeof google !== 'undefined' && google.maps && google.maps.places) {
      this.initializeAutocomplete();
    }
  }

  initializeAutocomplete() {
    if (typeof google !== 'undefined' && google.maps && google.maps.places) {
      // Function to clear previous autocomplete instances
      const clearAutocomplete = (
        autocompleteInstance: any,
        inputField: ElementRef
      ) => {
        if (autocompleteInstance) {
          google.maps.event.clearInstanceListeners(inputField.nativeElement);
          autocompleteInstance.unbindAll();
          autocompleteInstance = null;
        }
      };

      // Clear any previous autocomplete instances
      clearAutocomplete(this.dropoffAutocomplete, this.inputFieldTwo);
      clearAutocomplete(this.pickUpAutocomplete, this.inputFieldOne);

      // Function to initialize autocomplete instance
      const initializeAutocompleteInstance = (
        inputField: ElementRef,
        callback: any
      ) => {
        const autocompleteInstance = new google.maps.places.Autocomplete(
          inputField.nativeElement
        );
        autocompleteInstance.addListener('place_changed', () => {
          const place = autocompleteInstance.getPlace();
          callback(place?.name || '');
        });
        return autocompleteInstance;
      };

      // Initialize based on checkNumber
      if (this.checkNumber === 0) {
        this.dropoffAutocomplete = initializeAutocompleteInstance(
          this.inputFieldTwo,
          (name: any) => {
            this._toAirport = name;
          }
        );
      } else if (this.checkNumber === 1) {
        this.pickUpAutocomplete = initializeAutocompleteInstance(
          this.inputFieldOne,
          (name: any) => {
            this._fromAirport = name;
          }
        );
      } else {
        this.dropoffAutocomplete = initializeAutocompleteInstance(
          this.inputFieldTwo,
          (name: any) => {
            this._toAirport = name;
          }
        );
        this.pickUpAutocomplete = initializeAutocompleteInstance(
          this.inputFieldOne,
          (name: any) => {
            this._fromAirport = name;
          }
        );
      }
    } else {
      console.error('Google Maps API is not loaded');
    }
  }

  check(id: number) {
    this.isSubmitted = false;
    this.checkNumber = id;
    // this.initializeAutocomplete();
    if (this.checkNumber == 0) {
      this._toAirport = '';
      this._fromAirport = this.fixLocation;
    } else if (this.checkNumber == 1) {
      this._fromAirport = '';
      this._toAirport = this.fixLocation;
    } else {
      this._fromAirport = '';
      this._toAirport = '';
    }
  }

  isreturn() {
    this.returns = !this.returns;
    if (this.returns) {
      this.bookingForm.patchValue({
        returnDate: this.returns
          ? this.nextDate.setDate(this.currentDate.getDate() + 1)
          : null,
        returnPassengers: null,
        returnLagguages: null,
      });
    }
  }

  Booking(body: any) {
    this.bookingService.addBooking(body).subscribe((response: any) => {
      if (response.succes) {
        let successResp = response.message;
        this.show(successResp, response.succes);
        this.showDialog();
        this.isLoader = false;
      } else {
        let badResp = response.message;
        this.show(badResp, response.succes);
        this.isLoader = false;
      }
    });
  }

  submits() {
    this.isSubmitted = true;
    if (this.bookingForm.valid) {
      this.isLoader = true;
      this.Booking(this.bookingForm.value);
    }
  }

  showDialog() {
    this.visible = true;
  }

  verify(body: verificationCodeInterface) {
    this.bookingService.verifyToken(body).subscribe(
      (response: any) => {
        if (response.succes === true) {
          let successResp = response.message;
          // this.toastr.success(successResp);
          this.show(successResp, response.succes);
          this.bookingForm.patchValue({
            name: '',
            email: '',
            phoneNumber: '+1',
          });
        }
      },
      (error) => {
        console.error('API call error:', error);
        let badResp = error.error.message;
        this.message = badResp;
        this.messageColor = error.error.succes;
      }
    );
  }

  onCodeChanged(code: string) {}

  onCodeCompleted(code: string, isEmail: boolean) {
    if (isEmail) {
      this.emailCode = code;
    } else {
      this.phoneCode = code;
    }
  }

  verifyBtn() {
    this.verificationCode = {
      emailCode: this.emailCode,
      phoneCode: this.phoneCode,
    };
    this.verify(this.verificationCode);
    this.isSubmitted = false;
    this.visible = false;
  }
  show(mesg: string, status: boolean) {
    this.messageService.add({
      severity: status ? 'success' : 'error',
      summary: status ? 'Success' : 'Error',
      detail: mesg,
    });
  }

  // openVerticallyCentered() {
  //   // this.modalRef = this.modalService.open(content, {
  //   //   windowClass: 'my-class',
  //   //   ariaLabelledBy: 'modal-basic-title',
  //   //   centered: true,
  //   // });
  // }
}

export class RoomModel {
    Id: string;
    RoomNo: string;
    NoOfBed: number;
    AcnonAc: boolean;
    IsOccupied: boolean;
    IsCleaned: boolean;
    createdBy: string;
    created: string;
    lastModifiedBy: string;
    lastModified: string;
    charges: string;
    occupiedRoomData: OccupiedRoomDetailModel;
}

export class OccupiedRoomDetailModel {
    CheckInTime: string;
    CheckOutTime: string;
    RoomId: string;
    CustomerId: string;
    CustomerName: string;
    Room: string;
    Customer: string;
}

export class BookRoomModel {
    checkInTime: string;
    checkOutTime: string;
    roomId: string;
    customerId: string;
}

export class RoomCountModel {
    VacantRooms: number;
    OccupiedRoomCount: number;
    UnderCleanedRoomCount: number;
}

export class occuupiedCustomerInfo {
    AddressLine1: string;
    AddressLine2: string;
    City: string;
    Country: string;
    Created: string;
    CreatedBy: string;
    Document: string;
    DocumentId: string;
    DocumentNo: string;
    FirstName: string;
    Id: 2
    LastModified: string;
    LastModifiedBy: string;
    LastName: string;
    MiddleName: string;
    PhoneNo: string;
    State: string;
    Zipcode: string;
    CheckinTime: string;
}

export class OccupiedRoomModel {
    CustomerInfo: occuupiedCustomerInfo;
    RoomDetails: RoomModel;
    CheckinTime: string;
}   

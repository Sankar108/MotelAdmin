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
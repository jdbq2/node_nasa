export interface Launch {
    customers: string[];
    destination: string;
    flightNumber: number;
    launchDate: Date;
    mission: string;
    rocket: string;
    success: boolean;
    upcoming: boolean;
}

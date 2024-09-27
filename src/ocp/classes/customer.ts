import { CustomerProtocol } from "./interfaces/customer-protocol";

export class IndividualCustomer implements CustomerProtocol {
    firstName: string;
    lastName: string;
    cpf: string;

    constructor(firstName: string, lastName: string, cpf: string){
        
    }
}
export class EnterpriseCustomer implements CustomerProtocol {}
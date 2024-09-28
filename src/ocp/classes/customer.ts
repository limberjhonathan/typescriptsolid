import { CustomerProtocol } from "./interfaces/customer-protocol";

export class IndividualCustomer implements CustomerProtocol {
    firstName: string;
    lastName: string;
    cpf: string;
    cnpj: string;

    constructor(firstName: string, lastName: string, cpf: string){
        this.firstName = 'firstName';
        this.lastName = 'latName';
        this.cpf = cpf;
        this.cnpj = ''
    }
}
export class EnterpriseCustomer implements CustomerProtocol {
    firstName: string;
    lastName: string;
    cpf: string;
    cnpj: string;

    constructor(firstName: string, lastName: string, cpf: string){
        this.firstName = 'firstName';
        this.lastName = 'latName';
        this.cpf = cpf;
        this.cnpj = ''
    }
}
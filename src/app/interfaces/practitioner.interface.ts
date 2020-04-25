export interface Practitioner {
    id?: string;
    practitonerID: string;
    email: string;
    family: string;
    given: string;
    prefix: string;
    suffix: string;
    registration: string;
    workgroup: string;
    name?: string;
    roles: string[];
}

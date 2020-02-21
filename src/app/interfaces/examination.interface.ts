export interface Examination {
    examinationID: string;
    practitionerID: string;
    practitionerName?: string;
    patientName: string;
    patientTaj: string;
    creationDate: Date;
    expirationDate: Date;
    diagnosisDate: Date;
    basicImg: string[];
    dermaImg: string[];
    scoreType: string;
    score: string[];
    diagnostics: string;
    clinicalDiagnose: string;
    description: string;
}

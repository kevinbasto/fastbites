export interface Personalization {
  company: {
    name: string;
    description: string;
    logo: File | string;
  }
  personalization: {
    background: File | string;
    buttonColor: string;
    actionsFontColor: string;
  }
}
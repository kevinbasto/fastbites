import { Injectable } from '@angular/core';
import * as xlsx from 'xlsx';

@Injectable({
  providedIn: 'root'
})
export class XlsxProcessorService {
  constructor() { }

  async convertToJson(file: File): Promise<any[]> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      // When the file is loaded
      reader.onload = (event) => {
        try {
          const data = new Uint8Array(event.target?.result as ArrayBuffer);
          const workbook = xlsx.read(data, { type: 'array' });

          // Assuming the first sheet is the one you want to parse
          const sheetName = workbook.SheetNames[0];
          const worksheet = workbook.Sheets[sheetName];

          // Convert the sheet to JSON
          const jsonData = xlsx.utils.sheet_to_json(worksheet, { header: 1 });

          // You can customize the JSON structure based on your columns
          const processedData = this.mapJsonData(jsonData as any);
          resolve(processedData);
        } catch (error) {
          reject(error);
        }
      };

      reader.onerror = (error) => reject(error);
      reader.readAsArrayBuffer(file);
    });
  }

  // Example of mapping data from columns to a product-like structure
  private mapJsonData(jsonData: any[][]): any[] {
    if (jsonData.length < 2) return [];

    const headers = jsonData[0]; // First row as headers
    const rows = jsonData.slice(1); // Remaining rows as data

    return rows.map((row) => {
      const product: any = {};
      headers.forEach((header: string, index: number) => {
        product[header] = row[index] || null; // Map columns to object properties
      });
      return product;
    });
  }
}

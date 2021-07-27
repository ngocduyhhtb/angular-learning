import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MessagesService {
  public messages: string[] = [];
  constructor() {}

  public add(message: string): void {
    this.messages.push(message);
  }
  public clear(): void {
    this.messages = [];
  }
}

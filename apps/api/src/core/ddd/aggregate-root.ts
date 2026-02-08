import BaseEntity from "./entity.base";

export abstract class AggregateRoot extends BaseEntity {
  private _domainEvents: DomainEvent[] = [];

  protected addDomainEvent(event: DomainEvent) {
    this._domainEvents.push(event);
  }

  getDomainEvents(): DomainEvent[] {
    return [...this._domainEvents];
  }

  clearDomainEvents(): void {
    this._domainEvents = [];
  }
}

export interface DomainEvent {
  occurredAt: Date;
  aggregateId: string;
  eventType: string;
}

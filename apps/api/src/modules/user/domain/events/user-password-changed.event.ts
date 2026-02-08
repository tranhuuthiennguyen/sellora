import { DomainEvent } from "@/core/ddd/aggregate-root";

export class UserPasswordChangedEvent implements DomainEvent {
  readonly eventType = "UserPasswordChanged";
  readonly occurredAt: Date;
  readonly aggregateId: string;

  constructor(
    public readonly payload: {
      userId: string;
      changedAt: Date;
    },
  ) {
    this.occurredAt = payload.changedAt;
    this.aggregateId = payload.userId;
  }
}

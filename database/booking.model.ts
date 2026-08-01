import mongoose, { Schema, type CallbackWithoutResultAndOptionalError, type Model, type Types } from 'mongoose';
import { Event, type IEventDocument } from './event.model';

export interface IBooking {
    eventId: Types.ObjectId;
    email: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface IBookingDocument extends IBooking, mongoose.Document<Types.ObjectId> { }

const bookingSchema = new Schema<IBookingDocument>(
    {
        eventId: {
            type: Schema.Types.ObjectId,
            ref: 'Event',
            required: [true, 'Event reference is required'],
            index: true,
        },
        email: {
            type: String,
            required: [true, 'Email is required'],
            trim: true,
            lowercase: true,
            match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Please provide a valid email address'],
        },
    },
    {
        timestamps: true,
        strict: true,
    },
);

// Validate that the referenced event exists before the booking is saved.
bookingSchema.pre('save', async function (this: IBookingDocument, next: CallbackWithoutResultAndOptionalError) {
    try {
        const existingEvent = await Event.exists({ _id: this.eventId }) as IEventDocument | null;
        if (!existingEvent) {
            throw new Error('Referenced event does not exist');
        }

        next();
    } catch (error) {
        next(error as Error);
    }
});

export const Booking = (mongoose.models.Booking as Model<IBookingDocument>) || mongoose.model<IBookingDocument>('Booking', bookingSchema);

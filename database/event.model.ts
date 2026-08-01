import mongoose, { Schema, type CallbackWithoutResultAndOptionalError, type Model, type Types } from 'mongoose';

export interface IEvent {
    title: string;
    slug: string;
    description: string;
    overview: string;
    image: string;
    venue: string;
    location: string;
    date: string;
    time: string;
    mode: string;
    audience: string;
    agenda: string[];
    organizer: string;
    tags: string[];
    createdAt: Date;
    updatedAt: Date;
}

export interface IEventDocument extends IEvent, mongoose.Document<Types.ObjectId> { }

const nonEmptyString = {
    type: String,
    trim: true,
    validate: {
        validator: (value: string) => value.length > 0,
        message: 'Value cannot be empty',
    },
};

const nonEmptyStringArray = {
    type: [String],
    validate: {
        validator: (value: string[]) => value.length > 0,
        message: 'At least one item is required',
    },
};

const eventSchema = new Schema<IEventDocument>(
    {
        title: { ...nonEmptyString, required: [true, 'Title is required'] },
        slug: { type: String, required: [true, 'Slug is required'], unique: true, trim: true },
        description: { ...nonEmptyString, required: [true, 'Description is required'] },
        overview: { ...nonEmptyString, required: [true, 'Overview is required'] },
        image: { ...nonEmptyString, required: [true, 'Image is required'] },
        venue: { ...nonEmptyString, required: [true, 'Venue is required'] },
        location: { ...nonEmptyString, required: [true, 'Location is required'] },
        date: { ...nonEmptyString, required: [true, 'Date is required'] },
        time: { ...nonEmptyString, required: [true, 'Time is required'] },
        mode: { ...nonEmptyString, required: [true, 'Mode is required'] },
        audience: { ...nonEmptyString, required: [true, 'Audience is required'] },
        agenda: { ...nonEmptyStringArray, required: [true, 'Agenda is required'] },
        organizer: { ...nonEmptyString, required: [true, 'Organizer is required'] },
        tags: { ...nonEmptyStringArray, required: [true, 'Tags are required'] },
    },
    {
        timestamps: true,
        strict: true,
    },
);

function toSlug(value: string): string {
    return value
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
}

function toIsoDate(value: string): string {
    const parsed = new Date(value);
    if (Number.isNaN(parsed.getTime())) {
        throw new Error('Invalid date format');
    }

    return parsed.toISOString().slice(0, 10);
}

function toConsistentTime(value: string): string {
    const trimmed = value.trim();
    const match = trimmed.match(/^(\d{1,2})(?::(\d{2}))?\s*(am|pm)?$/i);

    if (!match) {
        throw new Error('Invalid time format');
    }

    const hours = Number(match[1]);
    const minutes = match[2] ? Number(match[2]) : 0;
    const period = match[3]?.toLowerCase();

    if (minutes > 59 || hours > 12) {
        throw new Error('Invalid time format');
    }

    let normalizedHours = hours;
    if (period === 'pm' && hours < 12) {
        normalizedHours += 12;
    }
    if (period === 'am' && hours === 12) {
        normalizedHours = 0;
    }

    return `${String(normalizedHours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
}

// Generate a URL-friendly slug from the title and only update it when the title changes.
eventSchema.pre('save', function (this: IEventDocument, next: CallbackWithoutResultAndOptionalError) {
    try {
        if (this.isModified('title') || this.isNew) {
            this.slug = toSlug(this.title);
        }

        if (this.isModified('date') || this.isNew) {
            this.date = toIsoDate(this.date);
        }

        if (this.isModified('time') || this.isNew) {
            this.time = toConsistentTime(this.time);
        }

        next();
    } catch (error) {
        next(error as Error);
    }
});

eventSchema.index({ slug: 1 }, { unique: true });

export const Event = (mongoose.models.Event as Model<IEventDocument>) || mongoose.model<IEventDocument>('Event', eventSchema);

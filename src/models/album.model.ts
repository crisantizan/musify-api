import mongoose, { model } from 'mongoose';
import { ArtistDocument } from './artist.model';
const { Schema } = mongoose;

export interface AlbumDocument extends mongoose.Document {
  title: string;
  description: string;
  year: number;
  cover: string;
  artist: ArtistDocument;
}

const AlbumSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    year: { type: Number, required: true },
    cover: { type: String, required: false },
    artist: { type: Schema.Types.ObjectId, ref: 'Artist', required: true },
  },
  { timestamps: true },
);

export default model<AlbumDocument>('Album', AlbumSchema);
package rxinvoice.domain;

import org.jongo.marshall.jackson.oid.Id;
import org.jongo.marshall.jackson.oid.ObjectId;

public class Blob {
    @Id
    @ObjectId
    private String id;
    private String fileName;
    private String comments;
    private String mimeType;
    private long sizeInBytes;
    private long number;

    public String getFileName() {
        return fileName;
    }

    public String getMimeType() {
        return mimeType;
    }

    public long getSizeInBytes() {
        return sizeInBytes;
    }

    public Blob setFileName(final String fileName) {
        this.fileName = fileName;
        return this;
    }

    public Blob setMimeType(final String mimeType) {
        this.mimeType = mimeType;
        return this;
    }

    public Blob setSizeInBytes(final long sizeInBytes) {
        this.sizeInBytes = sizeInBytes;
        return this;
    }

    public long getNumber() {
        return number;
    }

    public Blob setNumber(final long number) {
        this.number = number;
        return this;
    }

    public String getId() {
        return id;
    }

    public Blob setId(final String id) {
        this.id = id;
        return this;
    }

    public String getComments() {
        return comments;
    }

    public Blob setComments(final String comments) {
        this.comments = comments;
        return this;
    }

    @Override
    public String toString() {
        return "Blob{" +
                "id='" + id + '\'' +
                ", fileName='" + fileName + '\'' +
                ", comments='" + comments + '\'' +
                ", mimeType='" + mimeType + '\'' +
                ", sizeInBytes=" + sizeInBytes +
                ", number=" + number +
                '}';
    }


}

package rxinvoice;

import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.DeserializationContext;
import com.fasterxml.jackson.databind.JsonDeserializer;
import com.fasterxml.jackson.databind.SerializerProvider;
import com.fasterxml.jackson.databind.module.SimpleModule;
import de.undercouch.bson4jackson.BsonGenerator;
import de.undercouch.bson4jackson.serializers.BsonSerializer;
import org.joda.time.LocalDate;
import org.joda.time.LocalDateTime;

import java.io.IOException;
import java.util.Date;

public class BsonJodaTimeMoreModule extends SimpleModule {
    public BsonJodaTimeMoreModule() {
        super("BsonJodaTimeMoreModule");

        addSerializer(LocalDateTime.class, new BsonSerializer<LocalDateTime>() {
            @Override
            public void serialize(LocalDateTime date, BsonGenerator bsonGenerator, SerializerProvider serializerProvider)
                    throws IOException {
                if (date == null) {
                    serializerProvider.defaultSerializeNull(bsonGenerator);
                } else {
                    bsonGenerator.writeDateTime(date.toDate());
                }
            }
        });

        addDeserializer(LocalDateTime.class, new JsonDeserializer<LocalDateTime>() {
            @Override
            public LocalDateTime deserialize(JsonParser jp, DeserializationContext ctxt) throws IOException, JsonProcessingException {
                Date date = (Date) jp.getEmbeddedObject();
                return LocalDateTime.fromDateFields(date);
            }
        });
        addSerializer(LocalDate.class, new BsonSerializer<LocalDate>() {
            @Override
            public void serialize(LocalDate date, BsonGenerator bsonGenerator, SerializerProvider serializerProvider)
                    throws IOException {
                if (date == null) {
                    serializerProvider.defaultSerializeNull(bsonGenerator);
                } else {
                    bsonGenerator.writeDateTime(date.toDate());
                }
            }
        });

        addDeserializer(LocalDate.class, new JsonDeserializer<LocalDate>() {
            @Override
            public LocalDate deserialize(JsonParser jp, DeserializationContext ctxt) throws IOException, JsonProcessingException {
                Date date = (Date) jp.getEmbeddedObject();
                return LocalDate.fromDateFields(date);
            }
        });
    }
}

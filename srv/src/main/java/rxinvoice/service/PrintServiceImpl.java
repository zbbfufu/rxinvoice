package rxinvoice.service;

import com.google.common.io.ByteStreams;
import fprint.core.Printer;
import fprint.core.PrinterExecutorPhantomJs;
import fprint.core.PrinterFile;
import restx.factory.Component;
import restx.security.RestxSessionCookieFilter;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.util.HashMap;
import java.util.Map;

@Component
public class PrintServiceImpl implements PrintService {

    public void exportUriToPdf(String baseUrl, RestxSessionCookieFilter sessionFilter, String pageUri, OutputStream outputStream) throws IOException {

        String url = baseUrl + (baseUrl.endsWith("/") ? "" : "/") + "#" + pageUri;

        Map<String, Object> parameters = new HashMap<String, Object>();
        parameters.put("authorization", "print:a93d7f10a1f30aedcc1fa7ea4513e80d");
        Printer printer = new PrinterFile(new PrinterExecutorPhantomJs());
        printer.setUrl(url);
        printer.setUseCache(true);

        File tmp = File.createTempFile("print", "");
        printer.setFileName(tmp.getName());
        printer.setOutputDir(tmp.getParentFile());
        printer.setParameters(parameters);
        File fileGenerated = printer.print();

        ByteStreams.copy(new FileInputStream(fileGenerated), outputStream);
    }

}
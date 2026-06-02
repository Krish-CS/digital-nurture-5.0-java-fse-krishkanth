import java.io.*;
import java.net.*;
public class ChatClient {
    public static void main(String[] args) throws Exception {
        Socket s = new Socket("localhost", 5000);
        BufferedReader in = new BufferedReader(new InputStreamReader(s.getInputStream()));
        BufferedWriter out = new BufferedWriter(new OutputStreamWriter(s.getOutputStream()));
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String clientMsg, serverMsg;
        while (true) {
            System.out.print("Client: ");
            clientMsg = br.readLine();
            out.write(clientMsg + "\n");
            out.flush();
            if (clientMsg.equals("bye")) break;
            serverMsg = in.readLine();
            System.out.println("Server: " + serverMsg);
        }
        s.close();
    }
}

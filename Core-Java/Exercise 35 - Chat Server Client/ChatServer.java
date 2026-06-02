import java.io.*;
import java.net.*;
public class ChatServer {
    public static void main(String[] args) throws Exception {
        ServerSocket server = new ServerSocket(5000);
        System.out.println("Server waiting for client...");
        Socket client = server.accept();
        System.out.println("Client connected");
        BufferedReader in = new BufferedReader(new InputStreamReader(client.getInputStream()));
        BufferedWriter out = new BufferedWriter(new OutputStreamWriter(client.getOutputStream()));
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String clientMsg, serverMsg;
        while (true) {
            clientMsg = in.readLine();
            if (clientMsg == null || clientMsg.equals("bye")) break;
            System.out.println("Client: " + clientMsg);
            System.out.print("Server: ");
            serverMsg = br.readLine();
            out.write(serverMsg + "\n");
            out.flush();
        }
        client.close();
        server.close();
    }
}

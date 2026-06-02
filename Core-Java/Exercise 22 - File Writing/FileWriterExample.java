import java.io.FileWriter;
import java.io.IOException;
import java.util.Scanner;
public class FileWriterExample {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        System.out.print("Enter a string: ");
        String s = scanner.nextLine();
        try (FileWriter fw = new FileWriter("Core-Java/output.txt")) {
            fw.write(s + System.lineSeparator());
            System.out.println("Written");
        } catch (IOException e) {
            System.out.println("Error");
        }
        scanner.close();
    }
}
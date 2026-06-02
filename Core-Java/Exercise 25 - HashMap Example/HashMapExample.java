import java.util.HashMap;
import java.util.Scanner;
public class HashMapExample {
    public static void main(String[] args) {
        HashMap<Integer, String> students = new HashMap<>();
        Scanner scanner = new Scanner(System.in);
        System.out.print("How many students to add? ");
        int count = scanner.nextInt();
        scanner.nextLine();
        for (int i = 0; i < count; i++) {
            System.out.print("Enter student ID: ");
            int id = scanner.nextInt();
            scanner.nextLine();
            System.out.print("Enter student name: ");
            String name = scanner.nextLine();
            students.put(id, name);
        }
        System.out.print("Enter ID to search: ");
        int searchId = scanner.nextInt();
        String found = students.get(searchId);
        if (found != null) {
            System.out.println("Name: " + found);
        } else {
            System.out.println("Student not found");
        }
        scanner.close();
    }
}

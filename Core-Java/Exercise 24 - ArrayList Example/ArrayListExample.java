import java.util.ArrayList;
import java.util.Scanner;
public class ArrayListExample {
    public static void main(String[] args) {
        ArrayList<String> names = new ArrayList<>();
        Scanner scanner = new Scanner(System.in);
        System.out.print("How many names do you want to add? ");
        int count = scanner.nextInt();
        scanner.nextLine();
        for (int i = 0; i < count; i++) {
            System.out.print("Enter name: ");
            names.add(scanner.nextLine());
        }
        System.out.println("Names entered:");
        for (String name : names) {
            System.out.println(name);
        }
        scanner.close();
    }
}

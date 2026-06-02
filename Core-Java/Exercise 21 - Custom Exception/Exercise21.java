import java.util.Scanner;
public class Exercise21 {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        System.out.print("Enter age: ");
        int age = scanner.nextInt();
        try {
            if (age < 18) {
                throw new InvalidAgeException("Age must be at least 18");
            }
            System.out.println("Age accepted: " + age);
        } catch (InvalidAgeException e) {
            System.out.println(e.getMessage());
        } finally {
            scanner.close();
        }
    }
}
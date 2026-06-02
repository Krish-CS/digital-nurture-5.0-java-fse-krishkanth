import java.util.Scanner;
public class GradeCalculator {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        System.out.print("Enter marks out of 100: ");
        int marks = scanner.nextInt();
        if (marks >= 90) System.out.println("A");
        else if (marks >= 80) System.out.println("B");
        else if (marks >= 70) System.out.println("C");
        else if (marks >= 60) System.out.println("D");
        else System.out.println("F");
        scanner.close();
    }
}
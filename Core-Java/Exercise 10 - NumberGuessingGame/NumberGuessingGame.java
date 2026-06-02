import java.util.Random;
import java.util.Scanner;
public class NumberGuessingGame {
    public static void main(String[] args) {
        Random rand = new Random();
        int target = rand.nextInt(100) + 1;
        Scanner scanner = new Scanner(System.in);
        int guess;
        do {
            System.out.print("Guess the number (1-100): ");
            guess = scanner.nextInt();
            if (guess < target) System.out.println("Too low");
            else if (guess > target) System.out.println("Too high");
        } while (guess != target);
        System.out.println("Correct");
        scanner.close();
    }
}
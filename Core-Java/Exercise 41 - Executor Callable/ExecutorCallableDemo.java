import java.util.concurrent.*;
public class ExecutorCallableDemo {
    public static void main(String[] args) throws Exception {
        ExecutorService ex = Executors.newFixedThreadPool(2);
        Future<Integer> f1 = ex.submit(() -> 10 + 20);
        Future<Integer> f2 = ex.submit(() -> 30 + 40);
        Future<Integer> f3 = ex.submit(() -> 50 + 60);
        System.out.println("Result 1: " + f1.get());
        System.out.println("Result 2: " + f2.get());
        System.out.println("Result 3: " + f3.get());
        ex.shutdown();
    }
}
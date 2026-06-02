public class VirtualThreadsDemo {
    public static void main(String[] args) throws Exception {
        long start = System.currentTimeMillis();
        Thread[] threads = new Thread[100_000];
        for (int i = 0; i < threads.length; i++) {
            int taskId = i;
            threads[i] = Thread.startVirtualThread(() -> {
                System.out.println("Task " + taskId + " running on " + Thread.currentThread());
            });
        }
        for (Thread t : threads) {
            t.join();
        }
        long virtualEnd = System.currentTimeMillis();
        System.out.println("Virtual threads time: " + (virtualEnd - start) + " ms");

        long normalStart = System.currentTimeMillis();
        Thread[] normalThreads = new Thread[1000];
        for (int i = 0; i < normalThreads.length; i++) {
            int taskId = i;
            normalThreads[i] = new Thread(() -> System.out.println("Normal task " + taskId));
            normalThreads[i].start();
        }
        for (Thread t : normalThreads) {
            t.join();
        }
        long normalEnd = System.currentTimeMillis();
        System.out.println("Normal threads time for 1000 threads: " + (normalEnd - normalStart) + " ms");
    }
}

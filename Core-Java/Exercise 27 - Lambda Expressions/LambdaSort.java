import java.util.Arrays;
import java.util.Collections;
import java.util.List;
public class LambdaSort {
    public static void main(String[] args) {
        List<String> list = Arrays.asList("banana", "apple", "pear");
        Collections.sort(list, (a, b) -> a.compareTo(b));
        for (String s : list) {
            System.out.println(s);
        }
    }
}
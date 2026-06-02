import java.util.List;
record Person(String name, int age) {}
public class PersonRecordDemo {
    public static void main(String[] args) {
        List<Person> people = List.of(
            new Person("Alice", 30),
            new Person("Bob", 17),
            new Person("Charlie", 25),
            new Person("Diana", 15)
        );
        List<Person> adults = people.stream()
                                    .filter(p -> p.age() >= 18)
                                    .toList();
        System.out.println("Adults: " + adults);
    }
}

package com.davehowson.woodpecker.util;

import com.davehowson.woodpecker.exception.ResourceNotFoundException;
import com.davehowson.woodpecker.model.Note;
import com.davehowson.woodpecker.model.TagName;
import com.davehowson.woodpecker.model.Task;
import com.davehowson.woodpecker.model.User;
import com.davehowson.woodpecker.repository.NoteRepository;
import com.davehowson.woodpecker.repository.TaskRepository;
import com.davehowson.woodpecker.repository.UserRepository;
import com.github.javafaker.Faker;
import com.github.javafaker.service.FakeValuesService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.context.event.EventListener;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.time.LocalTime;
import java.time.ZoneId;
import java.util.Arrays;
import java.util.List;
import java.util.Random;
import java.util.concurrent.TimeUnit;

@Component
public class DatabaseSeeder {

    private Logger logger = LoggerFactory.getLogger(DatabaseSeeder.class);
    private TaskRepository taskRepository;
    private UserRepository userRepository;
    private NoteRepository noteRepository;
    private JdbcTemplate jdbcTemplate;
    private Faker faker;

    @Autowired
    public DatabaseSeeder(TaskRepository taskRepository, UserRepository userRepository,
                          NoteRepository noteRepository, JdbcTemplate jdbcTemplate) {
        this.userRepository = userRepository;
        this.taskRepository = taskRepository;
        this.noteRepository = noteRepository;
        this.jdbcTemplate = jdbcTemplate;
    }

    @EventListener
    public void seed(ContextRefreshedEvent event) {
        User user = userRepository.findByEmail("john@example.com")
                .orElseThrow(() -> new ResourceNotFoundException("User", "email", "John"));
        seedTasksTable(user);
        seedNotesTable(user);
    }

    private void seedTasksTable(User user) {
        String sql = "SELECT description FROM tasks T WHERE T.description = 'Seed data to the database' LIMIT 1";
        List<Task> t = jdbcTemplate.query(sql, (resultSet, rowNum) -> null);
        if (t == null || t.size() <= 0) {
            Task task = new Task();
            task.setDescription("Seed data to the database");
            task.setTag("WORK");
            task.setTime(LocalTime.parse("21:30"));
            task.setDate(LocalDate.parse("2019-06-02"));
            task.setComplete(false);
            task.setUser(user);
            taskRepository.save(task);
            seedTaskList(user);
            logger.info("Task data seeded");
        } else {
            logger.info("Task data is available");
        }
    }

    private void seedTaskList(User user) {
        faker = new Faker();
        LocalDate date = LocalDate.now();
        for (int i = 0; i < 10; i++) {
            Task task = new Task();
            task.setDescription(faker.harryPotter().quote());
            task.setTag(getTag());
            task.setUser(user);
            task.setDate(date.plusDays(i));
            LocalTime localTime = faker.date().future(5, TimeUnit.DAYS).toInstant().atZone(ZoneId.systemDefault()).toLocalTime();
            task.setTime(localTime);
            task.setComplete(new Random().nextBoolean());
            taskRepository.save(task);
        }
    }

    private void seedNotesTable(User user) {
        String sql = "SELECT title FROM notes T WHERE T.title = 'Database Seeder' LIMIT 1";
        List<Task> t = jdbcTemplate.query(sql, (resultSet, rowNum) -> null);
        if (t == null || t.size() <= 0) {
            Note note = new Note();
            note.setTitle("Database Seeder");
            note.setDescription("Database is seeded based on this note. If you delete this, the database will be seeded again");
            note.setImportant(false);
            note.setTag("WORK");
            note.setUser(user);
            seedNotesList(user);
            noteRepository.save(note);
            logger.info("Note data seeded");
        } else {
            logger.info("Note data is available");
        }
    }

    private void seedNotesList(User user) {
        faker = new Faker();
        for (int i = 0; i < 30; i++) {
            String title = faker.harryPotter().location();
            String description = new StringBuilder()
                    .append("<p><h1>"+ title +"</h1><br/>")
                    .append(faker.harryPotter().character()+" was at " +faker.harryPotter().location())
                    .append(" saying to " + faker.harryPotter().character())
                    .append(" that "+faker.chuckNorris().fact()+"<br/><br/>")
                    .append("- <em>Definitely</em> a quote from "+faker.harryPotter().book()+"</em>")
                    .append("<br/><br/><h3><em>&ldquo;"+faker.harryPotter().quote()+"&rdquo;</em></h3></p>")
                    .toString();

            Note note = new Note();
            note.setTitle(title);
            note.setDescription(description);
            note.setTag(getTag());
            note.setImportant(new Random().nextBoolean());
            note.setUser(user);
            noteRepository.save(note);
        }
    }

    private String getTag() {
        List<TagName> tagNames = Arrays.asList(TagName.values());
        int rnd = new Random().nextInt(tagNames.size());
        TagName tagName = tagNames.get(rnd);
        return tagName.name();
    }
}

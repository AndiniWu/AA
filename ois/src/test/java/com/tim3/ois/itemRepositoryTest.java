package com.tim3.ois;

import com.tim3.ois.model.Item;
import org.junit.runner.RunWith;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.context.junit4.SpringRunner;

import javax.persistence.EntityManager;

@RunWith(SpringRunner.class)
@DataJpaTest
public class itemRepositoryTest {
    EntityManager entityManager;



}

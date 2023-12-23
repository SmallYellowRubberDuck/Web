import entity.Result;
import entity.Type;
import helping.ValueValidator;
import lombok.Getter;

import javax.faces.bean.ManagedBean;
import javax.faces.bean.SessionScoped;
import javax.persistence.*;
import java.io.Serializable;

import java.util.Collections;
import java.util.List;

import static helping.HitValidator.isHit;
import static helping.TimeManager.getCurrentTimestamp;

@Getter
@ManagedBean(name = "resultBean")
@SessionScoped
public class ResultBean implements Serializable {

    private List<Result> resultList;
    private Result newResult;
    private EntityManagerFactory entityManagerFactory;

    @PersistenceContext(unitName = "table")
    private EntityManager entityManager;
    private EntityTransaction entityTransaction;

    public ResultBean(){
        connectToDB();
        loadDB();
        newResult = new Result();
    }

    private void connectToDB() {
        try {
            entityManagerFactory = Persistence.createEntityManagerFactory("table");
            entityManager = entityManagerFactory.createEntityManager();
            entityTransaction = entityManager.getTransaction();
            System.out.println("Connection to database has been established successfully!");
        } catch (Exception e) {
            System.out.println("Connection to database hasn't been established by the reason: " + e.getMessage());
        }
    }

    private void loadDB() {
        connectToDB();
        try {
            entityTransaction.begin();
            resultList = entityManager.createQuery("SELECT d FROM Result d ", Result.class).getResultList();
            Collections.sort(resultList, new Result.publicComparator());
            entityTransaction.commit();
            System.out.println("Data has been loaded successfully.");
            entityManager.close();
        } catch (Exception e) {
            System.out.println("Data loading error: " + e.getMessage());
        }
    }


    public void addResult(Type type) {
        connectToDB();
        try {
            entityTransaction.begin();
            long startTime = System.nanoTime();
            ValueValidator validator = new ValueValidator();
            newResult.setType(type);
            if(validator.validate(newResult.getX(), newResult.getY(), newResult.getR(), newResult.getType())){
                newResult.setHit(isHit(newResult.getX(), newResult.getY(), newResult.getR()));
                newResult.setExecutionTime((double) (System.nanoTime() - startTime) / 1000);
                newResult.setCurrentTime(getCurrentTimestamp());
                resultList.add(newResult);
                System.out.println("New result " + newResult);
                entityManager.persist(newResult);
                entityTransaction.commit();
            }
            Collections.sort(resultList, new Result.publicComparator());
            // Очистка newResult для следующего ввода
            newResult = new Result();
        } catch (Exception e){
            System.out.println("Result adding error: " + e.getMessage());
        }

    }

    public void clearResults() {
        connectToDB();
        newResult = new Result();
        try {
            entityTransaction.begin();
            entityManager.createQuery("DELETE FROM Result", Result.class).executeUpdate();
            resultList.clear();
            entityTransaction.commit();
            System.out.println("Results cleaned successfully!");
            entityManager.close();
        } catch (Exception e) {
            System.out.println("Results cannot be cleaned: " + e.getMessage());
        }
    }

    public void setResultList(List<Result> resultList){
        this.resultList = resultList;
    }
    public void setNewResult(Result newResult){
        this.newResult = newResult;
    }

}
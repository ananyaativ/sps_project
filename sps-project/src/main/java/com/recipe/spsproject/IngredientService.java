package com.recipe.spsproject;

import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.*;
import com.google.firebase.cloud.FirestoreClient;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.ExecutionException;


@Service
public class IngredientService {

    public String createIngredient(Ingredient ingredient) throws ExecutionException, InterruptedException {
        Firestore db = FirestoreClient.getFirestore();
        ApiFuture<WriteResult> collectionsApiFuture = db.collection("ingredients").document(ingredient.getDocumentId()).set(ingredient);
        return collectionsApiFuture.get().getUpdateTime().toString();
    }

    public Ingredient getIngredient(String documentId) throws ExecutionException, InterruptedException {
        Firestore db = FirestoreClient.getFirestore();
        DocumentReference documentReference = db.collection("ingredients").document(documentId);
        ApiFuture<DocumentSnapshot> future = documentReference.get();
        DocumentSnapshot document = future.get();
        Ingredient ingredient;
        if (document.exists()) {
            ingredient = document.toObject(Ingredient.class);
            return ingredient;
        }
        return null;
    }

    public List<Ingredient> filterIngredient(String type) throws ExecutionException, InterruptedException {
        Firestore db = FirestoreClient.getFirestore();
        // asynchronously retrieve multiple documents
        ApiFuture<QuerySnapshot> future = db.collection("ingredients").whereEqualTo("type", type).get();
        // future.get() blocks on response
        List<QueryDocumentSnapshot> documents = future.get().getDocuments();
        List<Ingredient> ingredients = new ArrayList<>();
        for (DocumentSnapshot document : documents) {
            ingredients.add(document.toObject(Ingredient.class));
        }
        return ingredients;
    }
}

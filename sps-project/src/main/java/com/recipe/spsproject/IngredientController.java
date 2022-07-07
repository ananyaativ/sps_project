package com.recipe.spsproject;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.concurrent.ExecutionException;

@RestController
@CrossOrigin(origins = "*")
public class IngredientController {
    public IngredientService ingredientService;

    public IngredientController(IngredientService ingredientService){
        this.ingredientService=ingredientService;
    }

    @PostMapping("/create")
    public String createIngredient(@RequestBody Ingredient ingredient) throws InterruptedException, ExecutionException {
        return ingredientService.createIngredient(ingredient);
    }

    @GetMapping("/get")
    public Ingredient getIngredient(@RequestParam String documentId) throws InterruptedException, ExecutionException {
        return ingredientService.getIngredient(documentId);
    }

    @GetMapping("/filter")
    public List<Ingredient> filterIngredient(@RequestParam String type) throws InterruptedException, ExecutionException {
        return ingredientService.filterIngredient(type);
    }

    @GetMapping("/test")
    public ResponseEntity<String> testGetPoints() { return ResponseEntity.ok("Test Get Endpoint is working");}
}

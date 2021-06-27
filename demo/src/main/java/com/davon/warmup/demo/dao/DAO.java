package com.davon.warmup.demo.dao;

import java.util.List;

public interface DAO <T>{

	List<T> getAsList();
	
	int create(T t);
	
	T getById(int id);
	
	int update(T t, int id);
	
	void deleteById(int id);
}

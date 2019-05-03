package com.davehowson.woodpecker.payload;

import javax.validation.constraints.NotNull;
import java.util.List;

public interface ApiRequest {

    List<String> getTagNames();

    void setTagNames(List<String> tagNames);
}
